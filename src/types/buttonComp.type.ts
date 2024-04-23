export interface ButtonCompProps {
  value: string;
  type: 'submit' | 'reset' | 'button';
  ariaLable?: string;
  name?: string;
  disabled?: boolean;
  onClick: (...arg: any[]) => any;
}
