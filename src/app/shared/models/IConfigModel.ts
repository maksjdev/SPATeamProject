
export interface IConfigModel {
  // Общие настройки:
  defaultPage: number;
  defaultPeriod: string;
  defaultMinRating: number;
  // Настройка компонентов
  categoryBlock_max: number;

  // Геттеры для общих полей:
  getDefaultPage(): number;
  getDefaultPeriod(): string;
  getDefaultRating(): number;
  getCategoryBlockMax(): number;
}
