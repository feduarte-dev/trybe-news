import { createContext } from 'react';
import { ReportType } from '../types';

type NewsContextType = {
  highlightsList: ReportType[]
  fetchAPI: (URL: string) => void
  handleClickCopy: (link: string) => void
  isCopied: boolean
  transformDate: (date: string) => string
  transformImg: (imgJson: string) => string
  isLoading: boolean
  cardsList: ReportType[]
  handleNavbarClick: (e: any) => void 
};

const NewsContext = createContext({} as NewsContextType);

export default NewsContext;