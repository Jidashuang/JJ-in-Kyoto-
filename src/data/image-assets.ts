const localImages = Array.from({ length: 164 }, (_, index) => `/images/${index + 1}.jpg`);

function imageAt(index: number): string {
  return localImages[index] ?? localImages[localImages.length - 1];
}

export function featureCoverImage(index: number): string {
  return imageAt(index);
}

export function neighborhoodHeroImage(index: number): string {
  return imageAt(10 + index);
}

export function placeHeroImage(index: number): string {
  return imageAt(16 + index);
}

export function placeGalleryImage(index: number): string | undefined {
  const image = imageAt(119 + index);
  return image ? image : undefined;
}
