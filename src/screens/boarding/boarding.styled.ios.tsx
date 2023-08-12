import styled from "styled-components/native";

export const Button = styled.Pressable`
  position: absolute;
  top: 578px;
  width: 100%;
  height: 100px;
  justify-contents: center;
  align-items: center;
  z-index: 1;
`;

export const BtnPressable = styled.Pressable<{
  background?: string;
}>`
  width: 95%;
  padding: 14px 20px 14px 20px;
  margin: auto;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background: #00BCD4;
`;

export const BtnLabel = styled.Text`
  font-family: Arial;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.4099999964237213px;
  text-align: left;
  color: #ffffff;
`;

export const Slides = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const Contents = styled.View<{ className?: boolean; }>`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: ${props => props.className ? 'flex' : 'none'};
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const Title = styled.Text`
  width: 60%;
  color: #ffffff;
  font-family: 'Arial';
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.0037px;
  text-align: center;
`;

export const Callout = styled.Text`
  width: 50%;
  font-family: 'Arial';
  font-size: 17px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`;
