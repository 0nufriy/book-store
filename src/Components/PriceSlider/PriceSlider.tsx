import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PriceSlider.css';

interface PriceSliderProps {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    onChange: (min: number, max: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
    min,
    max,
    valueMin,
    valueMax,
    onChange,
}) => {
    const [localMin, setLocalMin] = useState(valueMin);
    const [localMax, setLocalMax] = useState(valueMax);
    const [sliderWidth, setSliderWidth] = useState<number>(0);
    const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

    const sliderRef = useRef<HTMLDivElement>(null);
    const minThumbRef = useRef<HTMLDivElement>(null);
    const maxThumbRef = useRef<HTMLDivElement>(null);

    const calculatePosition = (value: number): number => {
        const range = max - min;
        const relativeValue = value - min;
        return (relativeValue / range) * sliderWidth;
    };

    const calculateValueFromPosition = (position: number): number => {
         const range = max - min;
         const relativePosition = position / sliderWidth;
         return  (relativePosition * range) + min;
    };

    const handleStart = ( thumbType: 'min' | 'max') => {
        setActiveThumb(thumbType);
    };

     const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
        if(!sliderRef.current || !activeThumb) return;

        const rect = sliderRef.current.getBoundingClientRect();
        let clientX = 0;

        if (e instanceof MouseEvent) {
            clientX = e.clientX;
          } else if(e instanceof TouchEvent){
              clientX = e.touches[0].clientX
          }
          
          const offsetX = clientX - rect.left;
          let newValue = calculateValueFromPosition(offsetX)
          
         if (activeThumb === 'min') {
           setLocalMin(Math.min(localMax, Math.max(min, parseFloat(newValue.toFixed(0)))));
         } else if(activeThumb === 'max') {
             setLocalMax(Math.max(localMin, Math.min(max, parseFloat(newValue.toFixed(0)))));
          }
     }, [activeThumb, calculateValueFromPosition, localMax, localMin, max, min]);


    const handleEnd = useCallback(() => {
        setActiveThumb(null);
    }, []);

    useEffect(() => {
        if (activeThumb) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
            window.addEventListener('touchcancel', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('touchcancel', handleEnd);
        };
    }, [activeThumb, handleMove, handleEnd]);


    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value)
        if(isNaN(newValue))
            setLocalMin(0);
        else
            setLocalMin(Math.min(localMax, Math.max(min, newValue)));
   };
  
   const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value)
        if(isNaN(newValue))
            setLocalMax(0);
        else
            setLocalMax(Math.max(localMin, Math.min(max, newValue)));
   };


   const handlePositionUpdate = useCallback(() => {
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.clientWidth);
        }
   }, [sliderRef]);
  
   useEffect(() => {
        handlePositionUpdate();
        window.addEventListener('resize', handlePositionUpdate);
    
        return () => {
            window.removeEventListener('resize', handlePositionUpdate);
        };
    }, [handlePositionUpdate])

    useEffect(() => {
        handlePositionUpdate();
        onChange(localMin, localMax);
    }, [localMin, localMax, onChange]);
  
    return (
        <div className="price-slider-container">
            <div className="input-container">
                <input
                    type="number"
                    className="price-input"
                    value={localMin}
                    onChange={handleMinInputChange}
                />
                <input
                    type="number"
                    className="price-input"
                    value={localMax}
                    onChange={handleMaxInputChange}
                />
            </div>
            
            <div
                className="slider-track"
                ref={sliderRef}
            >
                 <div
                    className="slider-range"
                    style={{
                        left: `${calculatePosition(localMin)}px`,
                        right: `${sliderWidth - calculatePosition(localMax)}px`,
                    }}
                ></div>
                <div
                    ref={minThumbRef}
                    className="slider-thumb"
                    style={{ left: `${calculatePosition(localMin)}px` }}
                   onMouseDown={() => handleStart('min')}
                   onTouchStart={() => handleStart('min')}
                ></div>
                <div
                    ref={maxThumbRef}
                    className="slider-thumb"
                    style={{ left: `${calculatePosition(localMax) - 16}px` }}
                   onMouseDown={() => handleStart('max')}
                   onTouchStart={() => handleStart('max')}
                ></div>
            </div>
        </div>
    );
};

export default PriceSlider;