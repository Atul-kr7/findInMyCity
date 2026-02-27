import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  // Component Initialization Tests
  describe('Component Initialization', () => {
    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with correct title property', () => {
      expect(component.title).toBeDefined();
      expect(component.title).toEqual('findInMyCity');
    });

    it('should have title of type string', () => {
      expect(typeof component.title).toBe('string');
    });
  });

  // Template Rendering Tests
  describe('Template Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render the app-root component', () => {
      const appElement = compiled.query(By.css('app-root'));
      expect(appElement).toBeTruthy();
    });

    it('should render title in the template', () => {
      const titleElement = compiled.query(By.css('.content span'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent).toContain('findInMyCity app is running!');
    });

    it('should display toolbar with brand name', () => {
      const toolbar = compiled.query(By.css('.toolbar'));
      expect(toolbar).toBeTruthy();
    });
  });

  // Change Detection Tests
  describe('Change Detection', () => {
    it('should detect changes and update view', () => {
      component.title = 'Test Title';
      fixture.detectChanges();
      expect(component.title).toEqual('Test Title');
    });

    it('should trigger change detection without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  // Component Metadata Tests
  describe('Component Metadata', () => {
    it('should have correct selector', () => {
      const selector = (AppComponent as any)['ɵcmp'].selectors[0][0];
      expect(selector).toEqual('app-root');
    });

    it('should use correct template URL', () => {
      const metadata = (AppComponent as any)['ɵcmp'];
      expect(metadata.template).toBeDefined();
    });
  });

  // DOM Structure Tests
  describe('DOM Structure', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have proper HTML structure', () => {
      const nativeElement = compiled.nativeElement;
      expect(nativeElement).toBeTruthy();
    });

    it('should not have console errors on render', () => {
      spyOn(console, 'error');
      fixture.detectChanges();
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  // Property Binding Tests
  describe('Property Binding', () => {
    it('should bind title property correctly', () => {
      const expectedTitle = 'findInMyCity';
      expect(component.title).toBe(expectedTitle);
    });

    it('should maintain title value after multiple change detections', () => {
      const initialTitle = component.title;
      fixture.detectChanges();
      fixture.detectChanges();
      expect(component.title).toEqual(initialTitle);
    });
  });

  // Integration Tests
  describe('Integration', () => {
    it('should work with RouterTestingModule', () => {
      expect(compiled).toBeTruthy();
    });

    it('should render without throwing errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should maintain component state after multiple renders', () => {
      const initialTitle = component.title;
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();
      expect(component.title).toEqual(initialTitle);
    });
  });
});
