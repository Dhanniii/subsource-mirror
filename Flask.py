from flask import Flask, jsonify, request, Response, stream_with_context
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:3001"
        ]
    }
})

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://subsource.net",
    "Referer": "https://subsource.net/",
}

COOKIES = {
    "_ga": "GA1.1.300217789.1754744985",
    "_ga_7BZ228VDJ3": "GS2.1.s1754744985$o1$g0$t1754744985$j60$l0$h0",
    "cf_clearance": "aoSXsrnR8qEtKmP_LeDy7vRHjdD9qZpRiMrxcyNft1Q-1754744986-1.2.1.1-6FMZKTzB.8.mwux_xlGjjFsvkyU45MhPwtOw8opcrOtnu9Bo3Gw0Hy2.rfB_w_DAZnIK1JL_mqq.smxQP.KRUr1yXEasEc3.j768CuoG4OXKIS57jDZUnzLkWlh6muxRWPuPQ2WW1MfzK0lnOM.Gnu.4C_XlxiT6WyfFxzv70DernKgyYUVafrnR9pkANJU0R4G7fvIfLGs5dBjnJKZU926Bezp19XQQniuoSykQ3HnJAsJp48NfGQNvusmvWxWM"
}

@app.route("/home")
def proxy_home():
    url = "https://api.subsource.net/v1/home"
    resp = requests.get(url, headers=HEADERS, cookies=COOKIES)
    try:
        return jsonify(resp.json())
    except Exception:
        return resp.text, resp.status_code

@app.route("/subtitles/<movie_name>")
def get_subtitles(movie_name):
    sort_by_date = request.args.get('sort_by_date', 'false')
    url = f"https://api.subsource.net/v1/subtitles/{movie_name}?sort_by_date={sort_by_date}"
    resp = requests.get(url, headers=HEADERS, cookies=COOKIES)
    try:
        return jsonify(resp.json())
    except Exception:
        return resp.text, resp.status_code


@app.route("/subtitles/<series_name>/<season>")
def get_series_subtitles(series_name, season):
    sort_by_date = request.args.get('sort_by_date', 'false')
    url = f"https://api.subsource.net/v1/subtitles/{series_name}/{season}?sort_by_date={sort_by_date}"
    resp = requests.get(url, headers=HEADERS, cookies=COOKIES)
    try:
        return jsonify(resp.json())
    except Exception:
        return resp.text, resp.status_code
    
#  format ukuran file
def format_file_size(bytes_val):
    try:
        b = int(bytes_val)
    except (ValueError, TypeError):
        return None
    if b == 0:
        return "0 Bytes"
    units = ["Bytes", "KB", "MB", "GB"]
    i = 0
    val = float(b)
    while val >= 1024 and i < len(units) - 1:
        val /= 1024.0
        i += 1
    return f"{val:.2f} {units[i]}"

@app.route("/subtitle/<movie_id>/<language>/<subtitle_id>")
def get_download_link(movie_id, language, subtitle_id):
    api_url = f"https://api.subsource.net/v1/subtitle/{movie_id}/{language}/{subtitle_id}"
    try:
        resp = requests.get(api_url, headers=HEADERS, cookies=COOKIES, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        subtitle_data = data.get("subtitle") or {}
        movie_data = data.get("movie") or {}

        download_token = subtitle_data.get("download_token")

        result = {
            "status": "available",
            "subtitle_id": subtitle_data.get("id") or subtitle_id,
            "download_token": download_token,
            "file_info": {
                "size": int(subtitle_data.get("size")) if subtitle_data.get("size") is not None else None,
                "size_formatted": format_file_size(subtitle_data.get("size")) if subtitle_data.get("size") is not None else None,
                "files_count": subtitle_data.get("files") or 1,
                "language": subtitle_data.get("language") or language,
                "encoding": subtitle_data.get("encoding"),
            },
            "movie_info": {
                "title": movie_data.get("title") or "",
                "year": movie_data.get("year") or movie_data.get("release_year"),
                "imdb_id": movie_data.get("imdb_id"),
                "poster": movie_data.get("poster"),
            },
            "subtitle_info": {
                "rating": subtitle_data.get("rating"),
                "votes": subtitle_data.get("votes", 0),
                "downloads": subtitle_data.get("downloads", 0),
                "uploaded_at": subtitle_data.get("uploaded_at"),
                "uploader": subtitle_data.get("uploader") or subtitle_data.get("uploaded_by"),
                "production_type": subtitle_data.get("production_type"),
                "release_type": subtitle_data.get("release_type"),
                "hearing_impaired": subtitle_data.get("hearing_impaired", False),
                "foreign_parts": subtitle_data.get("foreign_parts", False),
                "framerate": subtitle_data.get("framerate"),
            },
            "download_urls": {
                "api_download": f"https://api.subsource.net/v1/subtitle/download/{download_token}" if download_token else None,
                "direct_download": f"https://subsource.net/download/{download_token}" if download_token else None,
            },
            "user_data": {
                "is_downloaded": data.get("isDownloaded", False),
                "user_rated": data.get("user_rated"),
            },
        }

        title = result["movie_info"]["title"]
        year = result["movie_info"]["year"]
        lang = result["file_info"]["language"]
        if title:
            name = f"{title} {'(' + str(year) + ') ' if year else ''}{lang}.srt"
            result["file_name"] = " ".join(name.split())
        else:
            result["file_name"] = f"subtitle_{subtitle_id}_{language}.srt"

        return jsonify(result)

    except requests.RequestException as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "download_token": None,
            "file_name": "",
            "message": "Failed to extract download information"
        }), 502
    except ValueError:
        return jsonify({
            "status": "error",
            "error": "Invalid response format",
            "download_token": None,
            "file_name": "",
            "message": "Failed to extract download information"
        }), 502    


@app.route("/search", methods=["GET", "POST"])
def movie_search():
    incoming = request.get_json(silent=True) or request.args.to_dict(flat=True) or {}

    q = incoming.get("q") or incoming.get("query")
    if not q:
        return jsonify({"status": "error", "error": "Missing query param: q or query"}), 400

    # Normalisasi opsi
    page = incoming.get("page") or 1
    try:
        page = int(page)
    except Exception:
        page = 1

    
    payload = {"q": q, "query": q, "page": page}
    if "perPage" in incoming:
        try: payload["perPage"] = int(incoming["perPage"])
        except: pass
    if "per_page" in incoming and "perPage" not in payload:
        try: payload["perPage"] = int(incoming["per_page"])
        except: pass

    url = "https://api.subsource.net/v1/movie/search"
    try:
        upstream = requests.post(url, headers=HEADERS, cookies=COOKIES, json=payload, timeout=20)
        upstream.raise_for_status()
        try:
            return jsonify(upstream.json())
        except ValueError:
            return upstream.text, upstream.status_code
    except requests.RequestException as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "message": "Failed to fetch search results"
        }), 502

@app.route("/subtitle/download/<token>")
def subtitle_download(token):
    url = f"https://api.subsource.net/v1/subtitle/download/{token}"
    try:
        upstream = requests.get(
            url, headers=HEADERS, cookies=COOKIES, stream=True, timeout=60
        )
    except requests.RequestException as e:
        return jsonify({"status": "error", "error": str(e)}), 502

    if upstream.status_code >= 400:
        try:
            data = upstream.json()
        except Exception:
            data = {"status": "error", "error": upstream.text[:500]}
        return jsonify(data), upstream.status_code

    headers = {}
    for h in ("Content-Type", "Content-Length", "Content-Disposition"):
        if h in upstream.headers:
            headers[h] = upstream.headers[h]
    # Agar header bisa dibaca JS bila perlu
    headers["Access-Control-Expose-Headers"] = "Content-Disposition, Content-Length"

    return Response(
        stream_with_context(upstream.iter_content(chunk_size=8192)),
        status=upstream.status_code,
        headers=headers,
    )
if __name__ == "__main__":
    app.run(port=5000, debug=True)
