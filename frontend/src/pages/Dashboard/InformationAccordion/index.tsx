import ButtonDefault from "@/components/globals/Forms/ButtonDefault";
import dayjs from "dayjs";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  ExpandIconStyled,
  AccordionDetailsStyled,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { DataInfoProps } from "..";
import { ButtonAccordionStyles } from "@/theme/defaultStyles";

type InformationAccordionType = {
  dataInfo: DataInfoProps;
};

export default function InformationAccordion({
  dataInfo,
}: InformationAccordionType) {
  const navigate = useNavigate();

  return (
    <div>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={
            <ExpandIconStyled>
              <span className="material-symbols-outlined">expand_more</span>
            </ExpandIconStyled>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="material-symbols-outlined">notifications</span>
          {dataInfo.total + " " + dataInfo.title}
        </AccordionSummaryStyled>
        {dataInfo.description.map((item) => (
          <AccordionDetailsStyled key={item.id}>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                Validade CNH: {dayjs(item.validade_cnh).format("DD/MM/YYYY")}
              </td>
              <td>Viagens Offline: {item.total}</td>
              <td>
                <ButtonDefault
                  variant="contained"
                  color="secondary"
                  type="button"
                  text="VER CONDUTOR"
                  styles={ButtonAccordionStyles}
                  onClick={() => navigate(`/condutores/${item.id}`)}
                />
              </td>
            </tr>
          </AccordionDetailsStyled>
        ))}
      </AccordionStyled>
    </div>
  );
}
