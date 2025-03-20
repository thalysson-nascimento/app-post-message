import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  model,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { postMessageAction } from '../../../store/actions/post-message.action';
import { PostMessage } from '../../models/post-message.interface';

export interface DialogData {
  animal: string;
  name: string;
}

const MaterialModule = [
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
];

const CoreModule = [DatePipe];

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss'],
  imports: [...MaterialModule, ...CoreModule],
  standalone: true,
})
export class ListMessageComponent implements AfterViewInit {
  @Input() set messageList(messages: PostMessage[] | null) {
    if (messages) {
      this.dataSource.data = messages;
    }
  }
  displayedColumns: string[] = ['userId', 'email', 'message', 'date'];
  dataSource = new MatTableDataSource<PostMessage>([]);
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}

@Component({
  styleUrls: ['./list-message.component.scss'],
  selector: 'dialog-content',
  templateUrl: './ dialog-content/ dialog-content.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogContent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  protected readonly value = signal('');
  errorMessage = signal('');
  createMessageFormGroup!: FormGroup;
  disabledButton: boolean = false;
  mode: ProgressSpinnerMode = 'determinate';
  valueSpinner = 50;
  isLoadning: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createPostMessageFromBuild();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPostMessageFromBuild() {
    this.createMessageFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  sendMessage() {
    if (this.createMessageFormGroup.valid) {
      const { email, message } = this.createMessageFormGroup.value;

      const newPostMessage: PostMessage = {
        email,
        message,
        createdAt: new Date().toISOString(),
      };

      this.store.dispatch(
        postMessageAction.createPostMessage({ postMessage: newPostMessage })
      );

      this.dialogRef.close();
    }
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
