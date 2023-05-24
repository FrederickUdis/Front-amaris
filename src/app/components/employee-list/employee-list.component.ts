import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  searchId: string = '';

  constructor(private employeeService: EmployeeService) { }

  searchEmployee() {
    if (this.searchId) {
      const idNumber = Number(this.searchId);
      if (!isNaN(idNumber)) {
        if (idNumber > 0 && idNumber < 24) {
          this.employeeService.getEmployeeById(this.searchId).subscribe(
            employee => {
              this.employees = employee ? [employee] : [];
            },
            error => {
              console.error('Error al buscar el empleado:', error);
            }
          );
        } else {
          alert('El ID debe ser mayor a cero y menor a 24');
        }
      } else {
        alert('El ID debe ser un número');
      }
    } else {
      this.employeeService.getAllEmployees().subscribe(
        employees => {
          this.employees = employees;
        },
        error => {
          console.error('Error al obtener la lista de empleados:', error);
        }
      );
    }
  }

  calculateAnnualSalary(monthlySalary: number): number {
    const monthsInYear = 12;
    return monthlySalary * monthsInYear;
  }
}