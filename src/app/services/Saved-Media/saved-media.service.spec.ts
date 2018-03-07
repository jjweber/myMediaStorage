import { TestBed, inject } from '@angular/core/testing';

import { SavedMediaService } from './saved-media.service';

describe('SavedMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedMediaService]
    });
  });

  it('should be created', inject([SavedMediaService], (service: SavedMediaService) => {
    expect(service).toBeTruthy();
  }));
});
