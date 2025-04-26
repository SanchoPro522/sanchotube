const apiKey = 'AIzaSyDaIKRg_lJhqK854FZVtpYnuNGbh5946SQ'; // YouTube API kalitingiz
let nextPageToken = ''; // Keyingi sahifa tokeni
let isLoading = false; // Yangi video yuklanayotganda "loading" holati

// Video fetch qilish
function fetchVideos(query = 'music', loadMore = false) {
  if (isLoading) return; // Agar yuklanayotgan bo'lsa, yana biror narsa yuklamaymiz

  isLoading = true;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=12&q=${query}${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      nextPageToken = data.nextPageToken; // Keyingi sahifa tokenini saqlaymiz
      const container = document.querySelector('.video-container');
      
      if (!loadMore) {
        container.innerHTML = ''; // Agar yangi qidiruv boshlangan bo'lsa, avvalgi videolarni tozalash
      }

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const thumbnail = item.snippet.thumbnails.high.url;
        const title = item.snippet.title;
        const channelTitle = item.snippet.channelTitle;

        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
          <img src="${thumbnail}" alt="Video Thumbnail" onclick="openVideo('${videoId}')">
          <h3>${title}</h3>
          <p>${channelTitle}</p>
        `;
        container.appendChild(videoCard);
      });

      isLoading = false; // Yuklash tugadi
    })
    .catch(err => {
      console.error('Error fetching videos:', err);
      isLoading = false;
    });
}

// Videoni ochish
function openVideo(videoId) {
  window.location.href = `video.html?videoId=${videoId}`;
}

// Qidiruv funksiyasi
function searchVideos() {
  const query = document.getElementById('search-input').value;
  fetchVideos(query);
}

// Sayt ochilganda videolarni yuklash
fetchVideos();

// Infinite scroll (pastga tushirilganda yangi videolarni yuklash)
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.innerHeight + window.scrollY;
  
  if (scrollHeight - scrollPosition <= 100 && !isLoading) {
    fetchVideos(document.getElementById('search-input').value, true); // Yangi videolarni yuklash
  }
});
