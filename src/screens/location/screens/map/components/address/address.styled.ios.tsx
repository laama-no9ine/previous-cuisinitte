import { styled } from "styled-components/native";
import Mappin from "../../../../../../../assets/screens/location/mappin.svg";
import Map from "../../../../../../../assets/screens/location/map.svg";

export const UserAddress = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 100%;
  height: 200px;
  top: 405px;
  padding: 10px 15px;
  background: #FFFFFF;
  box-shadow: 0px 2px 66px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
`;

export const Confirm = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.38px;
  color: #000000;
  padding: 10px 0;
`;

export const AddressText = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  vertical-align: top;
`;

export const AddressIcon = styled(Mappin)`
`;

export const FlexContainer = styled.View`
  flex-direction: row;
`;

export const MapPlaceholder = styled(Map)``;
