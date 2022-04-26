import styled from 'styled-components'

export const ModalBackground = styled.div`
  background-color: #161616f1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled.div<{ types: string[] }>`
  background: ${(props) => {
    return props.types.length > 1
      ? `linear-gradient(150deg, var(--${props.types[0]}) 40%, var(--${props.types[1]}) 60%)`
      : `var(--${props.types[0]});`
  }};
  border: 1px solid #161616;
  border-radius: 8px;
  position: relative;
  height: 80vh;
  width: 70vw;
  text-align: center;

  .close {
    margin: 5px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #161616;
    background: none;
    width: 15%;
    position: absolute;
    right: 0;

    &:hover {
      background-color: #161616;
      color: white;
      font-weight: 700;
    }
  }

  img {
    height: 85%;
  }

  @media (max-width: 768px) {
    height: 80vh;
    width: 70vw;
    && img {
      height: 65%;
    }
  }

  @media (max-width: 480px) {
    height: 80vh;
    width: 90vw;

    && img {
      margin-top: 20%;
      height: 50%;
    }
  }

  .name {
    align-items: center;
    background-color: var(--p-background);
    color: var(--p-color);
    display: flex;
    font-size: 24px;
    height: 15%;
    justify-content: center;
    text-transform: capitalize;
    width: 100%;
  }
`
