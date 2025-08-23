export enum EMedicalAppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  ATTENDED = 'ATTENDED',
  NOT_ATTENDED = 'NOT_ATTENDED',
}

export const EMedicalAppointmentStatusLabels: Record<
  EMedicalAppointmentStatus,
  string
> = {
  [EMedicalAppointmentStatus.SCHEDULED]: 'Programada',
  [EMedicalAppointmentStatus.ATTENDED]: 'Asistió',
  [EMedicalAppointmentStatus.NOT_ATTENDED]: 'No Asistió',
};

export enum ESpecialty {
  GENERAL_MEDICINE = 'GENERAL_MEDICINE',
  PEDIATRICS = 'PEDIATRICS',
  INTERNAL_MEDICINE = 'INTERNAL_MEDICINE',
  SURGERY = 'SURGERY',
  OBSTETRICS_GYNECOLOGY = 'OBSTETRICS_GYNECOLOGY',
  CARDIOLOGY = 'CARDIOLOGY',
  DERMATOLOGY = 'DERMATOLOGY',
  ENDOCRINOLOGY = 'ENDOCRINOLOGY',
  GASTROENTEROLOGY = 'GASTROENTEROLOGY',
  NEUROLOGY = 'NEUROLOGY',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  PSYCHIATRY = 'PSYCHIATRY',
  ORTHOPEDICS = 'ORTHOPEDICS',
  UROLOGY = 'UROLOGY',
  ANESTHESIOLOGY = 'ANESTHESIOLOGY',
  RADIOLOGY = 'RADIOLOGY',
  EMERGENCY_MEDICINE = 'EMERGENCY_MEDICINE',
  RHEUMATOLOGY = 'RHEUMATOLOGY',
  NEPHROLOGY = 'NEPHROLOGY',
  HEMATOLOGY = 'HEMATOLOGY',
  ONCOLOGY = 'ONCOLOGY',
  INFECTIOLOGY = 'INFECTIOLOGY',
  PULMONOLOGY = 'PULMONOLOGY',
}

export const ESpecialtyLabels: Record<ESpecialty, string> = {
  [ESpecialty.GENERAL_MEDICINE]: 'Medicina General',
  [ESpecialty.PEDIATRICS]: 'Pediatría',
  [ESpecialty.INTERNAL_MEDICINE]: 'Medicina Interna',
  [ESpecialty.SURGERY]: 'Cirugía',
  [ESpecialty.OBSTETRICS_GYNECOLOGY]: 'Ginecología y Obstetricia',
  [ESpecialty.CARDIOLOGY]: 'Cardiología',
  [ESpecialty.DERMATOLOGY]: 'Dermatología',
  [ESpecialty.ENDOCRINOLOGY]: 'Endocrinología',
  [ESpecialty.GASTROENTEROLOGY]: 'Gastroenterología',
  [ESpecialty.NEUROLOGY]: 'Neurología',
  [ESpecialty.OPHTHALMOLOGY]: 'Oftalmología',
  [ESpecialty.PSYCHIATRY]: 'Psiquiatría',
  [ESpecialty.ORTHOPEDICS]: 'Ortopedia',
  [ESpecialty.UROLOGY]: 'Urología',
  [ESpecialty.ANESTHESIOLOGY]: 'Anestesiología',
  [ESpecialty.RADIOLOGY]: 'Radiología',
  [ESpecialty.EMERGENCY_MEDICINE]: 'Medicina de Urgencias',
  [ESpecialty.RHEUMATOLOGY]: 'Reumatología',
  [ESpecialty.NEPHROLOGY]: 'Nefrología',
  [ESpecialty.HEMATOLOGY]: 'Hematología',
  [ESpecialty.ONCOLOGY]: 'Oncología',
  [ESpecialty.INFECTIOLOGY]: 'Infectología',
  [ESpecialty.PULMONOLOGY]: 'Neumología',
}