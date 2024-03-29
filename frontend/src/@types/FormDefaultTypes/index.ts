import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

export type FormDefaultProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
};

export type FormDefaultPenaltyProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
  tripInformation: {
    origem: string;
    destino: string;
    data: string;
    dia_semana: string;
    hora: string;
    id_condutor: string;
  };
};
