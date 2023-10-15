import { ReportType } from "../types";

if (!JSON.parse(localStorage.getItem('Favorite News') as string)) {
  localStorage.setItem('Favorite News', JSON.stringify([]));
}

export const readFavoriteNews = (): ReportType[] => JSON.parse(
  localStorage.getItem('Favorite News') as string,
);

export const saveFavoriteNews = (favoriteNews: ReportType[]) => localStorage
.setItem('Favorite News', JSON.stringify(favoriteNews));

