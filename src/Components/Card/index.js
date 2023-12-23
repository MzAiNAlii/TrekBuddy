import Card1 from './Child/Card1'
import Card2 from './Child/Card2'
import Card3 from './Child/Card3'
import Card4 from './Child/Card4'
import Card5 from './Child/Card5'
import Card6 from './Child/Card6'
import './index.scss'
const Card = () => {
  return (
    <div className='display-flex'>
        <div>
      <Card1/>
      <Card3/>
      <Card5/>
      </div>

      <div className='flex-right'>
      <Card2/>
      <Card4/>
      <Card6/>
      </div>
    </div>
  )
}

export default Card
