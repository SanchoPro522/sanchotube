const apiKey = 'AIzaSyDaIKRg_lJhqK854FZVtpYnuNGbh5946SQ';
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('videoId');

// Video iframe yaratish
document.getElementById('video-player').innerHTML = `
  <iframe width="100%" height="600" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
`;

// Video haqida ma'lumotlarni olish
fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&id=${videoId}`)
  .then(res => res.json())
  .then(data => {
    const video = data.items[0];
    const title = video.snippet.title;
    const channelTitle = video.snippet.channelTitle;
    const likeCount = video.statistics.likeCount;
    const viewCount = video.statistics.viewCount;

    document.getElementById('video-info').innerHTML = `
      <h2>${title}</h2>
      <p>${channelTitle}</p>
      <p>👁 ${viewCount} Views | 👍 ${likeCount} Likes</p>
    `;
  })
  .catch(err => console.error('Error:', err));
