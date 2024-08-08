import {
  WrapperLogin,
  ContainerLogin,
  ContainerForm,
  WrapperTitle,
  WrapperForm,
  WrapperPassword,
  WrapperButton,
  FixedStripe,
  WrapperSelect,
} from "../styles";
import z from "zod";
import { useAuth } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/utils/registerSchema";
import { AccountLevel } from "@/enums/AccountLevel";
import { AccountType } from "@/enums/AccountType";
import InfoLogin from "@/components/globals/Layout/InfoLogin";
import InputLogin from "@/components/globals/Forms/InputLogin";
import InputPassword from "@/components/globals/Forms/InputPassword";
import ButtonDefault from "@/components/globals/Forms/ButtonDefault";
import SelectDefault from "@/components/globals/Forms/SelectDefault";
import { useNotification } from "@/hooks/Notification/useNotification";

type Inputs = z.infer<typeof RegisterSchema>;

export default function Register() {
  const { register: authRegister, errorMessage } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      accountType: AccountType.CORRENTE,
      accountLevel: AccountLevel.BRONZE,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await authRegister({
        name: data.name,
        password: data.password,
        type: data.accountType,
        level: data.accountLevel,
      });

      if (errorMessage) {
        reset();
      } else {
        notification({
          severity: "success",
          msg: "Cadastro realizado com sucesso!",
        });
        reset();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Dados inválidos.");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <WrapperLogin>
      <FixedStripe></FixedStripe>
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <h2>Registro</h2>
          </WrapperTitle>
          <WrapperForm onSubmit={handleSubmit(onSubmit)}>
            <InputLogin
              label="Nome"
              placeholder="Digite seu nome"
              messageError={errors.name?.message}
              register={register}
              registerName="name"
              type="text"
              maxLength={50}
            />

            <WrapperSelect>
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <SelectDefault
                    value={field.value || ""}
                    onChange={field.onChange}
                    messageError={errors.accountType?.message}
                    label="Tipo de Conta"
                    placeholder="Selecione o tipo de conta"
                    options={Object.keys(AccountType).map((key) => ({
                      value: AccountType[key as keyof typeof AccountType],
                      label: key,
                    }))}
                  />
                )}
              />
              <Controller
                name="accountLevel"
                control={control}
                render={({ field }) => (
                  <SelectDefault
                    value={field.value || ""}
                    onChange={field.onChange}
                    messageError={errors.accountLevel?.message}
                    label="Nível de Conta"
                    placeholder="Selecione o nível de conta"
                    options={Object.keys(AccountLevel).map((key) => ({
                      value: AccountLevel[key as keyof typeof AccountLevel],
                      label: key,
                    }))}
                  />
                )}
              />
            </WrapperSelect>

            <InputPassword
              label="Senha"
              placeholder="Digite sua senha"
              messageError={errors.password?.message}
              register={register}
              registerName="password"
            />
            <WrapperPassword>
              <InputPassword
                label="Confirme sua senha"
                placeholder="Digite sua senha novamente"
                messageError={errors.confirmPassword?.message}
                register={register}
                registerName="confirmPassword"
              />
              <WrapperButton>
                Já tem cadastro?{" "}
                <button onClick={() => navigate("/")}>Clique aqui</button>
              </WrapperButton>
            </WrapperPassword>

            <ButtonDefault
              variant="contained"
              color="secondary"
              type="submit"
              text="CADASTRAR"
              styles={{ width: "100%", height: "3rem", fontSize: "1rem" }}
            />
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
