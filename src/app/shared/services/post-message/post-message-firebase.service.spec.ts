/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PostMessageFirebaseService } from './post-message-firebase.service';

describe('Service: PostMessageFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostMessageFirebaseService],
    });
  });

  it('should ...', inject(
    [PostMessageFirebaseService],
    (service: PostMessageFirebaseService) => {
      expect(service).toBeTruthy();
    }
  ));
});
