import { Container } from "./styles";

type EmptyTabProps = {
  label: string;
};

export default function EmptyTab({ label }: EmptyTabProps) {
  return (
    <Container>
      <span className="material-symbols-outlined">warning</span>
      <p>{label}</p>
    </Container>
  );
}
