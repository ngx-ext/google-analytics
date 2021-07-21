import { ModuleWithProviders, NgModule } from '@angular/core';
import { GoogleAnalyticsService } from './ga.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
})
export class GoogleAnalyticsModule {
  public static forRoot(): ModuleWithProviders<GoogleAnalyticsModule> {
    return {
      ngModule: GoogleAnalyticsModule,
      providers: [
        GoogleAnalyticsService,
      ],
    };
  }
}
