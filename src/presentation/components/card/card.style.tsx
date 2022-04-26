import styled from 'styled-components'

export const CardContainer = styled.div<{ types: string[] }>`
  align-items: center;
  background: ${(props) => {
    return props.types.length > 1
      ? `linear-gradient(150deg, var(--${props.types[0]}) 40%, var(--${props.types[1]}) 60%)`
      : `var(--${props.types[0]});`
  }};
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0px #00000040;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  img {
    height: 85%;
  }

  .index {
    align-self: flex-start;
    background-color: var(--p-background);
    border-bottom-right-radius: 8px;
    color: var(--p-color);
    font-size: 16px;
    padding: 4px 8px;
    position: absolute;
  }

  .name {
    align-items: center;
    background-color: var(--p-background);
    color: var(--p-color);
    display: flex;
    font-size: 20px;
    height: 15%;
    justify-content: center;
    text-transform: capitalize;
    width: 100%;
  }
`
