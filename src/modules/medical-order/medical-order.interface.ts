import { ESpecialty } from '../../commons/enum/common';

export interface IMedicalOrder {
  medicalOrderId: string;
  medicalAppointmentId: string;
  description: string;
  expirationDate: Date;
  speciality: ESpecialty;
}
