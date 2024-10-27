import cardInfo from './cardInfo.json'; 

function card(){
  const firstCard = cardInfo.cards[0];


  return(
      <div>
        <img src={firstCard.svgPath} alt={firstCard.cardName} />
      </div>
  )
}

export default card;
