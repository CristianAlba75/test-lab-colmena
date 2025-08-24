import { EMedicalAppointmentStatus } from '../../commons/enum/common';

export interface IMedicalAppointment {
  medicalAppointmentId: string;
  appointmentDate: Date;
  doctorId: string;
  patientId: string;
  status: EMedicalAppointmentStatus;
  dateUpdateStatus?: Date;
}
