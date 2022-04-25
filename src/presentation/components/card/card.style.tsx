import './card.style.css'
import styled from 'styled-components'

export const CardContainer = styled.div<{ types: string[] }>`
  background: ${(props) => {
    if (props.types.length > 1) {
      return `linear-gradient(135deg, var(--${props.types[0]}) 50%, var(--${props.types[1]}) 50%)`
    } else {
      return `var(--${props.types[0]});`
    }
  }};
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 4px;

  border-radius: 8px;
  border: 1px solid #16161680;
  align-items: center;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px #00000040;

  img {
    height: 80%;
    margin: auto auto;
  }

  .tag {
    background-color: #16161680;
    position: absolute;
    padding: 4px 4px;
    border-bottom-right-radius: 8px;
    align-self: flex-start;
    color: white;
    font-size: 14px;
  }

  .name {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #16161680;
    color: white;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
`
