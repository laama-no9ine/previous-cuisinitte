import styled from "styled-components/native";
import Load from "../../../assets/screens/location/load.svg";

export const Wrapperr = styled.View<{
  position?: string;
  positionType?: string;
}>`
  position: ${props => props.positionType || `absolute`};
  top: ${props => props?.position || `578px`};
  width: 100%;
  height: 100px;
  justify-contents: center;
  align-items: center;
  z-index: 1;
`;

export const Pressble = styled.Pressable<{
  background?: string;
}>`
  width: 95%;
  padding: 14px 20px 14px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background: ${props => props.theme.palettes.colors.primary[props?.background || 'pc1']};
`;

export const Txt = styled.Text`
  font-family: Poppins;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.4099999964237213px;
  text-align: left;
  color: #ffffff;
`;

export const LoadPlaceholder = styled(Load)`
  position: absolute;
  z-index: 1;
  left: 70px;
  top: 14px;
`;
