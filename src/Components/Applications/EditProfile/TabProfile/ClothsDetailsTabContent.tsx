import { ProfileTabContentProp } from "@/Types/EcommerceType";
import { TabContent, TabPane } from "reactstrap";
import React from "react";
import DropzoneContainer from "@/Components/Drop_zone";
import BaseInputContainer from "@/Components/Form&Table/Form/FormControls/BaseInput"

const ProfilTabContent :React.FC<ProfileTabContentProp> = ({ activeTab }) => {

  const Description1 = 'Refresh your wardrobe with this chic top. With an eye-catching square neck, this top also features pretty puff sleeves. Stunning pink colour Classic solid pattern Square neck Elasticated puff sleeves Belt included, Polyester fabric, machine wash.."';
  const Description2 = "Tee Stores is an Indian contemporary clothing brand. The product pages display a fine quality fabric with colorful description. We offer many vivid designs, art, styles that combine heritage with modernity, simplicity, playfulness and street style";
  const Description3 = "Lorate Solid Men's Fashion Full Sleeves Latest Jacket for Men With Button Closure Long Sleeve Casual Torn Lycra Denim Jacket.";
  const Description4 = "Rock Paper Scissors Various Dots Half Sleeves Girl’s Regular Fit T-Shirt I 100% Cotton T Shirt with Half Sleeve Round Neck I Regular Wear Solid Kids Tees and Black Sleeve.";

  return (
    <TabContent activeTab={activeTab}>
      <TabPane tabId={1}>
        <DropzoneContainer/>
      </TabPane>
      <TabPane tabId={2}>
        <BaseInputContainer/>
      </TabPane>
      <TabPane tabId={3}>
        <p className="mb-0 m-t-20"> {Description4}</p>
      </TabPane>
    </TabContent>
  );
};

export default ProfilTabContent;
