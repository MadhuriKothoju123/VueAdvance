export interface DialogProps {
    isOpen: boolean;
    classes?: Record<string, any>;
    disableEscapeKeyDown?: boolean;
    fullScreen?: boolean;
    fullWidth?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string;
    closeIcon?: boolean
  }