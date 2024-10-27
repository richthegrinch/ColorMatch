import { useState, useEffect } from 'react'
import './App.css'
//import Card from './components/Cards.jsx'


//import Card from './components/Cards.jsx'
//import cardInfo from './components/cardInfo.json';

function App() {
  const [color, setColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [instructionFontColor, setInstructionFontColor] = useState('#ffffff'); // Default instruction font color
  const [isMatched, setIsMatched] = useState(false); // State to track if colors match


  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
    setFontColor(getFontColor(randomColor)); // Set font color based on background color
    setIsMatched(false); // Reset match state when button is pressed
  };

  const getFontColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b);
    return luminance > 128 ? '#000000' : '#FFFFFF';
  };

  const getInstructionsFontColor = (r, g, b) => {
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b);
    return luminance > 128 ? '#000000' : '#FFFFFF'; // Returns black for light colors and white for dark colors
  };

  const [rgbValues, setRgbValues] = useState({ R: '0', G: '0', B: '0' });
  const backgroundColor = `rgb(${rgbValues.R}, ${rgbValues.G}, ${rgbValues.B})`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10);

    // Check if input is a number and within the range 0-255
    if ((value === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 255))) {
      setRgbValues((prev) => {
        console.log({ ...prev, [name]: value }); // Log the updated state
        return { ...prev, [name]: value };
      });
    }
  };

  useEffect(() => {
    // Change background color of the root div
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = `rgb(${rgbValues.R}, ${rgbValues.G}, ${rgbValues.B})`;
    }
    const r = parseInt(rgbValues.R, 10);
    const g = parseInt(rgbValues.G, 10);
    const b = parseInt(rgbValues.B, 10);
    
    // Update instruction font color based on background color
    setInstructionFontColor(getInstructionsFontColor(r, g, b));

    const buttonColorR = parseInt(color.slice(1, 3), 16);
    const buttonColorG = parseInt(color.slice(3, 5), 16);
    const buttonColorB = parseInt(color.slice(5, 7), 16);

    const isBackgroundColorMatching = (buttonColorR === r && buttonColorG === g && buttonColorB === b);
    setIsMatched(isBackgroundColorMatching);
  }, [rgbValues]); // Re-run when rgbValues change
  
  return (
    <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '1rem',
          }}
        >
        <p className="instructions" style={{ color: instructionFontColor }}>
          Try to match the color with the RGB values!
        </p>

        <button
          className="btn jua-regular"
          style={{ backgroundColor: color, color: fontColor }}
          onClick={getRandomColor}
        >
          Hi!
        </button>
        
        <div className='inputtxt'
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <input 
            type="number" 
            name="R" 
            placeholder = "R"
            value = {rgbValues.R}
            onChange={handleInputChange}
            style={{ width: '60px', textAlign: 'center' }} 
          />
          <input 
            type="number" 
            name="G" 
            placeholder = "G"
            value = {rgbValues.G}
            onChange={handleInputChange}
            style={{ width: '60px', textAlign: 'center' }} 
          />
          <input 
            type="number" 
            name="B" 
            placeholder = "B"
            value = {rgbValues.B}
            onChange={handleInputChange}
            style={{ width: '60px', textAlign: 'center' }} 
          />
        </div>
        {isMatched && (
          <p className="instructions" style={{ color: instructionFontColor, fontWeight: 'bold' }}>Congrats! You matched!</p>
        )}
      </div>
    </>
  );
}

export default App


  // {() => setCount((count) => count + 1)}



  // const [count, setCount] = useState(0)
  // const [selectedCard, setSelectedCard] = useState(''); // State for the selected card
  // const [cardDescription, setCardDescription] = useState(''); // State for the card description

  // useEffect(() => {
  //   if (selectedCard) {
  //     const cardType = selectedCard.split('_')[0]; // Get the type (hearts, diamonds, etc.)
  //     setCardDescription(`It's a ${cardType}`); // Update the description
  //   } else {
  //     setCardDescription(''); // Reset description if no card is selected
  //   }
  // }, [selectedCard]); 

  // return (
  //   <>
  //     <div className="card">

  //       <h2>{cardDescription}</h2>

  //       <select className="select" value={selectedCard} onChange={(event) => setSelectedCard(event.target.value)}>
  //         <option value="">Select a card</option>
  //         {cardInfo.cards.map((card) => (
  //           <option key={card.cardName} value={card.cardName}>
  //             {card.cardName}
  //           </option>
  //         ))}
  //       </select>

  //       <div className="card-container">
  //         <Card cardName={selectedCard}/>
  //         <Card cardName={selectedCard}/>
  //         <Card cardName={selectedCard}/>
  //       </div>


  //     </div>
  //   </>
  // )
