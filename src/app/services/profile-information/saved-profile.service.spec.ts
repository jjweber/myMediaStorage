import { TestBed, inject } from '@angular/core/testing';

import { SavedProfileService } from './saved-profile.service';

describe('SavedProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedProfileService]
    });
  });

  it('should be created', inject([SavedProfileService], (service: SavedProfileService) => {
    expect(service).toBeTruthy();
  }));
});
