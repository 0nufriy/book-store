import React, {  useEffect } from 'react';
import "./Message.css"
interface MessageProps {
  message: string;
  type: 'success' | 'error';
  duration?: number; 
  onClose?: () => void; 
}

const Message: React.FC<MessageProps> = ({ message, type, duration = 3000, onClose }) => {
 
  useEffect(() => {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => clearTimeout(timer); 
    
  }, [duration, onClose]);

  const toastClassName = `toast ${type}`;

  return (
      <div className={toastClassName}>
        <p>{message}</p>
      </div>
    
  );
};

export default Message;