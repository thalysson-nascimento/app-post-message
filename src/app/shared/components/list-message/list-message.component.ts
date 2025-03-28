import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { postMessageAction } from '../../../store/actions/post-message.action';
import { selectLoading } from '../../../store/selectors/post-message.selector';
import { PostMessage } from '../../models/post-message.interface';

const MaterialModule = [
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
];

const CoreModule = [DatePipe, CommonModule];

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
  store: Store = inject(Store);
  displayedColumns: string[] = ['userId', 'email', 'message', 'date', 'delete'];
  dataSource = new MatTableDataSource<PostMessage>([]);
  readonly dialog = inject(MatDialog);
  isLoading$: Observable<boolean>;
  postMessage$ = this.store.select(postMessageSelector);
  loading$ = this.store.select(selectLoading);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor() {
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngAfterViewChecked() {
    if (this.paginator && this.dataSource.paginator !== this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    this.dialog.open(DialogContent);
  }

  deleteMessage(idPostMessage: string) {
    this.store.dispatch(postMessageAction.deletePostMessage({ idPostMessage }));
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
  readonly data = inject<PostMessage>(MAT_DIALOG_DATA);
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
    this.createMessageFormGroup.reset();
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
function postMessageSelector(state: object): unknown {
  throw new Error('Function not implemented.');
}
