# PaheSubs - Subtitle Download Platform

A modern web application for discovering and downloading subtitles for movies and TV series. Built with React.js frontend and Flask Python backend.

![PaheSubs Banner](https://cdn.discordapp.com/attachments/1397420970767024168/1403292192671272960/1754639327-picsaygh.jpg)

## 🌟 Features

- **Browse Popular Content**: Discover trending movies and TV series
- **Advanced Search**: Find subtitles by movie/series title
- **Multi-Language Support**: Download subtitles in various languages
- **Series Support**: Browse subtitles by seasons for TV series
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Downloads**: Direct subtitle file downloads with progress tracking

## 🚀 Tech Stack

### Frontend
- **React.js 18.2.0** - Modern UI library
- **React Router DOM 6.x** - Client-side routing
- **CSS3** - Custom styling with responsive design
- **FontAwesome** - Icon library

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Requests** - HTTP library for API calls

## 📁 Project Structure

```
pahesubs/
├── public/
│   ├── index.html
│   └── banner.webp
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Navbar/
│   │   ├── MovieCard/
│   │   ├── MovieGrid/
│   │   └── Buttons/
│   ├── pages/
│   │   ├── MovieDetail/
│   │   └── search/
│   ├── data/
│   │   └── movies.js
│   ├── styles/
│   │   ├── global.css
│   │   └── components/
│   ├── utils/
│   │   └── constants.js
│   ├── App.js
│   └── index.js
├── backend/
├── py.py (Flask API)
├── requirements.txt
└── README.md
```

## 🔄 Application Workflow

### 1. Home Page Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Opens    │───▶│  Load Home Page │───▶│  Render Header  │
│   Website       │    │  localhost:3000 │    │  + MovieGrid    │
│  (Browser)      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Display Popular │◀───│ Transform Data  │◀───│  Fetch API      │
│ Movies & Series │    │ movies.js       │    │ GET /home       │
│ in Grid Layout  │    │ transformMovie()│    │                 │
└─────────────────┘    │ transformSeries()│   └─────────────────┘
                       └─────────────────┘
```

**Detailed Process:**
```
🌐 User Access
    │
    ├─► 📱 localhost:3000
    │
    ├─► ⚛️  React Router: "/"
    │
    ├─► 🏠 Header Component Mount
    │
    ├─► 📊 MovieGrid Component Mount
    │
    ├─► 🔄 useEffect() triggers fetchMovies()
    │
    ├─► 🌐 API Call: GET http://127.0.0.1:5000/home
    │
    ├─► 📦 Response: { movies: [...], series: [...] }
    │
    ├─► 🔄 Data Transformation:
    │   │
    │   ├─► transformMovie(movie) → normalized movie data
    │   │
    │   └─► transformSeries(series) → normalized series data
    │
    ├─► 📋 Combine & Sort by popularity/downloads
    │
    └─► 🎨 Render MovieCard components in grid
```

### 2. Movie/Series Detail Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  User Clicks    │───▶│  Check Content  │───▶│   Navigation    │
│  Movie/Series   │    │      Type       │    │     Route       │
│     Card        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │     Movie?      │    │    Series?      │
                       │ /movie/:slug    │    │/movie/:slug/:s  │
                       └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Movie Info    │◀───│  MovieDetail    │───▶│  Series Info    │
│  + Subtitles    │    │   Component     │    │  + Subtitles    │
│     Table       │    │     Mount       │    │     Table       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       │                       ▲
         │                       ▼                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ GET /subtitles/ │    │  Extract Params │    │ GET /subtitles/ │
│   :movieSlug    │    │ useParams() Hook│    │:seriesSlug/:s   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Detailed Process:**
```
🖱️  User Click Event
    │
    ├─► 🔍 MovieCard.handleClick()
    │
    ├─► ❓ Check movie.type
    │   │
    │   ├─► 🎬 if (movie.type === 'movie')
    │   │   └─► 🛤️  navigate(`/movie/${movieSlug}`)
    │   │
    │   └─► 📺 if (movie.type === 'series')
    │       └─► 🛤️  navigate(`/movie/${seriesSlug}/${season}`)
    │
    ├─► ⚛️  React Router matches route
    │
    ├─► 📄 MovieDetail component mounts
    │
    ├─► 🔧 useParams() extracts: { movieSlug, season }
    │
    ├─► ❓ Determine content type:
    │   │
    │   ├─► 🎬 if (!season) → Movie
    │   │   └─► 🌐 fetchMovieDetail(movieSlug)
    │   │       └─► GET /subtitles/:movieSlug
    │   │
    │   └─► 📺 if (season) → Series  
    │       └─► 🌐 fetchSeriesDetail(movieSlug, season)
    │           └─► GET /subtitles/:movieSlug/:season
    │
    ├─► 📦 API Response: { movie: {...}, subtitles: [...] }
    │
    ├─► 🔄 Transform subtitle data
    │
    └─► 🎨 Render:
        │
        ├─► 🖼️  Movie poster & info
        │
        ├─► ⭐ Rating & metadata
        │
        └─► 📋 Subtitles table with download buttons
```

### 3. Subtitle Download Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  User Clicks    │───▶│  Get Download   │───▶│  Validate Token │
│ Download Button │    │     Token       │    │   & File Info   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       │                       │
         │                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Download Failed │◀───│  Error Handler  │    │   Token Valid?  │
│  Show Alert     │    │  Try-Catch      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                │                       ▼
                                │              ┌─────────────────┐
                                │              │ Create Download │
                                │              │     Link        │
                                │              └─────────────────┘
                                │                       │
                                │                       ▼
                                │              ┌─────────────────┐
                                │              │ Browser Handles │
                                │              │ File Download   │
                                │              └─────────────────┘
                                │                       │
                                │                       ▼
                                │              ┌─────────────────┐
                                └─────────────▶│ Success/Cleanup │
                                               │ Remove DOM Els  │
                                               └─────────────────┘
```

**Detailed Process:**
```
🖱️  Download Button Click
    │
    ├─► ⚡ handleDownload(language, subtitleId)
    │
    ├─► 🌐 Step 1: Get Download Token
    │   └─► GET /subtitle/${movieId}/${language}/${subtitleId}
    │
    ├─► 📦 Response: 
    │   {
    │     "status": "available",
    │     "download_token": "abc123...",
    │     "file_name": "movie_subtitle.srt",
    │     "file_info": {...}
    │   }
    │
    ├─► ✅ Validate Token
    │   │
    │   ├─► ❌ if (!token) → Show error alert
    │   │
    │   └─► ✅ if (token exists) → Continue
    │
    ├─► 🔗 Step 2: Create Download Process
    │   │
    │   ├─► 🏗️  Create <a> element
    │   │   │
    │   │   ├─► href: /subtitle/download/${token}
    │   │   │
    │   │   ├─► download: file_name
    │   │   │
    │   │   └─► target: "_blank"
    │   │
    │   ├─► 📎 Append to DOM
    │   │
    │   ├─► 🖱️  Programmatic click()
    │   │
    │   └─► 🧹 Cleanup after 100ms
    │
    ├─► 🌐 Step 3: Browser Download
    │   └─► GET /subtitle/download/${token}
    │       │
    │       ├─► 📁 Flask streams file content
    │       │
    │       └─► 💾 Browser saves file to Downloads
    │
    └─► ✅ Success
        │
        ├─► 🗑️  Remove temporary DOM elements
        │
        ├─► 📝 Console log: "Download initiated successfully"
        │
        └─► 🎉 File ready in user's Downloads folder
```

### 4. Search Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  User Types in  │───▶│  Navigate to    │───▶│  Search Component│
│  Search Query   │    │  /search Route  │    │     Mounts      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                                              │
         │                                              ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Back to Detail  │◀───│  User Clicks    │◀───│ Display Results │
│     Page        │    │    Result       │    │ Movies & Series │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        ▲
                                                        │
                       ┌─────────────────┐    ┌─────────────────┐
                       │  Transform &    │◀───│   API Call      │
                       │  Render Data    │    │ GET /search?q=  │
                       └─────────────────┘    └─────────────────┘
```

**Detailed Process:**
```
🔍 Search Interaction
    │
    ├─► ⌨️  User types in search input
    │
    ├─► 🛤️  Navigate to /search?q=query
    │
    ├─► ⚛️  Search component mounts
    │
    ├─► 🔧 useEffect() detects query parameter
    │
    ├─► 🌐 API Call: GET /search?q=${encodeURIComponent(query)}
    │
    ├─► 📦 Response: { movies: [...], series: [...] }
    │
    ├─► 🔄 Transform search results
    │   │
    │   ├─► transformMovie() for each movie
    │   │
    │   └─► transformSeries() for each series
    │
    ├─► 🎨 Render search results in grid
    │
    └─► 🖱️  User clicks result
        │
        └─► 🛤️  Navigate to appropriate detail page
            │
            ├─► 🎬 Movie → /movie/:slug
            │
            └─► 📺 Series → /movie/:slug/:season
```

## 🗺️ Complete User Journey Map
```
    🏠 HOME PAGE                 🔍 SEARCH PAGE              📄 DETAIL PAGE
         │                           │                           │
         ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  🎬 Movies      │◀────────│  🔍 Search      │────────▶│  📋 Subtitles   │
│  📺 Series      │         │     Results     │         │      Table      │
│  🔥 Popular     │         │                 │         │                 │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
         │                           ▲                           │
         │                           │                           ▼
         └─────────────┬─────────────┘                 ┌─────────────────┐
                       │                               │                 │
                       ▼                               │  💾 Download    │
              ┌─────────────────┐                      │     Process     │
              │                 │                      │                 │
              │  ⌨️  Search      │                      │                 │
              │     Input       │                      └─────────────────┘
              │                 │                               │
              └─────────────────┘                               ▼
                                                       ┌─────────────────┐
                                                       │                 │
                                                       │  ✅ File        │
                                                       │   Downloaded    │
                                                       │                 │
                                                       └─────────────────┘
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+ 
- Python 3.8+
- npm or yarn

### Frontend Setup
```bash
# Navigate to project directory
cd pahesubs

# Install dependencies
npm install

# Start development server
npm start

# Access application at http://localhost:3000
```

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask API
python py.py

# API will be available at http://127.0.0.1:5000
```

### Alternative Backend Installation
```bash
# Option 1: Using virtual environment (Recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Option 2: Manual installation
pip install Flask==2.3.3
pip install Flask-CORS==4.0.0
pip install requests==2.31.0
```

## 🔧 Configuration

### API Configuration
Edit `src/utils/constants.js`:
```javascript
export const API_URL = 'http://127.0.0.1:5000';
export const APP_NAME = 'PaheSubs';
```

### CORS Settings
The Flask backend is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://127.0.0.1:3000`
- Additional origins as needed

## 📡 API Endpoints

### Frontend Consumption

| Endpoint | Method | Purpose | Frontend Usage |
|----------|--------|---------|----------------|
| `/home` | GET | Get popular movies & series | Home page content |
| `/search?q={query}` | GET | Search content | Search functionality |
| `/subtitles/{movieSlug}` | GET | Get movie details & subtitles | Movie detail page |
| `/subtitles/{seriesSlug}/{season}` | GET | Get series details & subtitles | Series detail page |
| `/subtitle/{id}/{lang}/{subId}` | GET | Get download token | Download preparation |
| `/subtitle/download/{token}` | GET | Download subtitle file | Actual file download |

## 🎨 UI Components

### Core Components
- **Header**: Hero section with navigation
- **MovieGrid**: Responsive grid layout for content
- **MovieCard**: Individual movie/series cards
- **MovieDetail**: Detailed view with subtitle table
- **Navbar**: Navigation bar
- **Search**: Search interface

### Styling Architecture
- **Global Styles**: Base typography and layout
- **Component Styles**: Scoped CSS for each component
- **Responsive Design**: Mobile-first approach
- **CSS Variables**: Consistent color scheme and spacing

## 🔍 Data Flow

### State Management
```javascript
// Movie/Series data flow
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);

// Detail page data flow  
const [movieData, setMovieData] = useState(null);
const [error, setError] = useState(null);
```

### Data Transformation
```javascript
// Normalize different API responses
const transformMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  year: movie.release_year?.toString() || '',
  poster: movie.poster,
  type: 'movie'
});

const transformSeries = (series) => ({
  id: series.id,
  title: series.full_name,
  year: series.release_year?.toString() || '',
  poster: series.poster,
  type: 'series'
});
```

## 🚦 Error Handling

### Frontend Error Handling
- **Network Errors**: Connection timeout and retry logic
- **API Errors**: Graceful error messages for failed requests
- **Data Validation**: Null checks and fallback values
- **User Feedback**: Loading states and error alerts

### Download Error Handling
- **Token Validation**: Check download token availability
- **File Access**: Handle download failures gracefully
- **User Notifications**: Clear error messages for different scenarios

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Features
- Flexible grid layouts
- Touch-friendly buttons
- Optimized image loading
- Mobile navigation patterns

## 🔄 Future Enhancements

- [ ] User authentication and favorites
- [ ] Subtitle rating and reviews
- [ ] Advanced filtering options
- [ ] PWA capabilities
- [ ] Dark/light theme toggle
- [ ] Multi-language interface
- [ ] Subtitle preview functionality

## 📄 License

© 2025 Amicia Web Subtitles. All rights reserved.

## 🤝 Contributing

---

**Bawok**


