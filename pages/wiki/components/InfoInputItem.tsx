import { InfoItem, InfoTitle, InfoData, InfoInput } from '../style'; // styled-components 재사용

interface InfoInputItemProps {
  title: string;
  name: string;
  value: string;
  step: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InfoInputItem({ title, name, value, step, onChange }: InfoInputItemProps) {
  return (
    <InfoItem>
      <InfoTitle>{title}</InfoTitle>
      <InfoData>
        {step === 'editor' ? (
          <InfoInput name={name} placeholder={title} value={value} onChange={onChange} />
        ) : (
          <span>{value || '-'}</span>
        )}
      </InfoData>
    </InfoItem>
  );
}
