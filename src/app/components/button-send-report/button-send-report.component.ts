import { Component, OnInit, Input } from '@angular/core';
import { LeaderService } from 'src/app/services/LeaderSevice';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportService } from 'src/app/services/Excel-ExportService';

@Component({
  selector: 'app-button-send-report',
  templateUrl: './button-send-report.component.html',
  styleUrls: ['./button-send-report.component.css']
})
export class ButtonSendReportComponent implements OnInit {
  @Input() data : any = []; 
  @Input() inspection: any ;
  constructor(
    private leaderService : LeaderService,
    private toastr : ToastrService,
    private excelExportService : ExcelExportService
  ) { }

  ngOnInit() {
  }
  handleRefusalToSetEmail(data){

  }
  sendReport(){
    const body ={
      title : this.inspection.title,
      data : this.data,
      inspection_id : this.inspection.id
    }
    this.leaderService.sendReport(body).subscribe(data=>{
      if(data.message === 'report_sent'){
        this.excelExportService.exportAsExcelFile(this.data, 'Excel');
        this.toastr.success(data.message);
      }else{
        this.toastr.error(data.message);
      }
    })
  }
}
