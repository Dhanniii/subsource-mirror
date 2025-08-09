// Fungsi untuk membuat id dari title
const makeIdFromTitle = (title) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Ganti karakter non-alphanumeric dengan dash
    .replace(/^-+|-+$/g, ''); // Hapus dash di awal dan akhir
};

const rawMovies = [
  {
    title: "Pahe",
    year: "2013-2017",
    country: "United Kingdom",
    genres: ["Crime", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  {
    title: "The First Lady",
    year: "2022",
    country: "United States",
    genres: ["Biography", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
    {
    title: "Pahe",
    year: "2013-2017",
    country: "United Kingdom",
    genres: ["Crime", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  {
    title: "The First Lady",
    year: "2022",
    country: "United States",
    genres: ["Biography", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
    {
    title: "Pahe",
    year: "2013-2017",
    country: "United Kingdom",
    genres: ["Crime", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  {
    title: "The First Lady",
    year: "2022",
    country: "United States",
    genres: ["Biography", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
    {
    title: "Pahe",
    year: "2013-2017",
    country: "United Kingdom",
    genres: ["Crime", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  {
    title: "The First Lady",
    year: "2022",
    country: "United States",
    genres: ["Biography", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
    {
    title: "Pahe",
    year: "2013-2017",
    country: "United Kingdom",
    genres: ["Crime", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  {
    title: "The First Lady",
    year: "2022",
    country: "United States",
    genres: ["Biography", "Drama"],
    poster: "https://cdn.discordapp.com/attachments/1397420970767024168/1401472151403630684/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc._V1_FMjpg_UX1000_.jpg?ex=6895ac26&is=68945aa6&hm=b4e66a9adca44ca1f3042441e3f6214ec265683237f903bcb611747a3f2ea2f2&"
  },
  
  
  

  
  
];

// Tambahkan id otomatis ke setiap movie
const movies = rawMovies.map(movie => ({
  ...movie,
  id: makeIdFromTitle(movie.title)
}));

export default movies;