import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Delete, RotateCcw } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    soundManager.play('coin');
    
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    soundManager.play('coin');
    
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    soundManager.play('jump');
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    soundManager.play('powerup');
    
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const backspace = () => {
    soundManager.play('jump');
    
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`mario-block h-14 flex items-center justify-center font-bold text-lg ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="h-full bg-gradient-to-br from-red-100 to-yellow-100 p-6">
      <div className="max-w-md mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          🧮 Mario Calculator
        </motion.h1>

        <div className="mario-window p-6">
          {/* Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black text-green-400 p-4 rounded-lg mb-4 font-mono text-right text-2xl min-h-[60px] flex items-center justify-end border-2 border-gray-800"
          >
            {display}
          </motion.div>

          {/* Button Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-3"
          >
            {/* Row 1 */}
            <Button onClick={clear} className="bg-mario-red text-white">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button onClick={backspace} className="bg-mario-orange text-white">
              <Delete className="w-5 h-5" />
            </Button>
            <Button onClick={() => performOperation('/')} className="bg-mario-blue text-white">
              ÷
            </Button>
            <Button onClick={() => performOperation('*')} className="bg-mario-blue text-white">
              ×
            </Button>

            {/* Row 2 */}
            <Button onClick={() => inputNumber('7')}>7</Button>
            <Button onClick={() => inputNumber('8')}>8</Button>
            <Button onClick={() => inputNumber('9')}>9</Button>
            <Button onClick={() => performOperation('-')} className="bg-mario-blue text-white">
              −
            </Button>

            {/* Row 3 */}
            <Button onClick={() => inputNumber('4')}>4</Button>
            <Button onClick={() => inputNumber('5')}>5</Button>
            <Button onClick={() => inputNumber('6')}>6</Button>
            <Button onClick={() => performOperation('+')} className="bg-mario-blue text-white">
              +
            </Button>

            {/* Row 4 */}
            <Button onClick={() => inputNumber('1')}>1</Button>
            <Button onClick={() => inputNumber('2')}>2</Button>
            <Button onClick={() => inputNumber('3')}>3</Button>
            <Button onClick={performCalculation} className="bg-mario-green text-white row-span-2">
              =
            </Button>

            {/* Row 5 */}
            <Button onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button onClick={inputDecimal}>.</Button>
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <div className="mario-block p-3 bg-gradient-to-r from-yellow-400 to-red-400 text-black">
              <p className="text-xs font-bold">🪙 Mario's Math Helper</p>
              <p className="text-xs">Perfect for counting coins!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;