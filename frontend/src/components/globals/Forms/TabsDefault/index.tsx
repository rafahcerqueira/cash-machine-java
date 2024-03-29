import { StyledTabs, StyledTab } from "./styles";

type TabsProps = {
  tabsList: {
    label: string;
    value: number;
  }[];
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
};

export default function TabsDefault({
  tabsList,
  value,
  handleChange,
}: TabsProps) {
  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="tabs"
    >
      {tabsList.map((tab) => (
        <StyledTab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </StyledTabs>
  );
}
