
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Portfolio } from '../types/Portfolio';

const PORTFOLIO_KEY = '@hyrene_portfolio_data';

export const defaultPortfolio: Portfolio = {
  fullName: 'Nsabimana Irene',
  nickname: 'Hyrene',
  introduction: 'My name is Nsabimana Irene.',
  education: 'Software Engineering at INES-Ruhengeri',
  skills: ['Teamwork'],
  profileImage: null,
};

export async function savePortfolio(
  portfolio: Portfolio
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      PORTFOLIO_KEY,
      JSON.stringify(portfolio)
    );
  } catch (error) {
    console.error('Failed to save portfolio:', error);
    throw error;
  }
}

export async function loadPortfolio(): Promise<Portfolio> {
  try {
    const savedData = await AsyncStorage.getItem(PORTFOLIO_KEY);

    if (savedData === null) {
      return defaultPortfolio;
    }

    const parsedData: unknown = JSON.parse(savedData);

    if (
      typeof parsedData === 'object' &&
      parsedData !== null &&
      'fullName' in parsedData &&
      'nickname' in parsedData &&
      'introduction' in parsedData &&
      'education' in parsedData &&
      'skills' in parsedData &&
      Array.isArray(parsedData.skills)
    ) {
      return parsedData as Portfolio;
    }

    return defaultPortfolio;
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    return defaultPortfolio;
  }
}
