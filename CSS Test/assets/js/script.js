async function fetchImages() {
  try {
    const response = await fetch('https://picsum.photos/v2/list');
    if (!response.ok) {
      throw new Error(`Couldn't Fetch Images, status: ${response.status}`);
    }
    const images = await response.json();

    const imageContainer = document.getElementById('imageContainer');
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.download_url;
      imgElement.alt = image.author;
      imgElement.addEventListener('click', () => {
        window.open(image.download_url, '_blank');
      });
      imageContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }
}

fetchImages();
