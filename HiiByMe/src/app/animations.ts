import { trigger,state,style,animate,transition,keyframes} from '@angular/animations';


   export const fade=trigger('fade', [
  
   state('void',style({opacity:0})),


    transition(':enter', [
      
      animate(1000)
    ]),
    transition(':leave', [
      animate(1000)
    ])
   
    ])
 


  export const slide=trigger('slide', [

   transition(':enter', [
      
      animate('1000ms ease-in',style({

         transform:'translateX(-20px)',
      }))
    ]),



  
   transition(':leave', [
      animate('500ms ease-out',keyframes([

        style({
         offset:0.2,
         transform:'translateX(20px)',
         opacity:1
        }),
          style({
         offset:1,
         transform:'translateX(-100%)',

         opacity:0.5
        })

      ]))



   
    ])

   ])


   export const routeslide=trigger('routeslide', [

   transition(':enter', [
      
      style({

         transform:'translateY(-100%)',
         opacity:0
      }),
      animate(500)

    ]),



  
   transition(':leave', [
      animate('500ms',

        
          style({
  
         transform:'translateY(100%)',

         opacity:0
        }))

      ])


  
   
    ])

  
 
 export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0
  })),

  transition('collapsed => expanded', [
    animate('300ms ease-out', style({
      height: '*',
      paddingTop: '*',
      paddingBottom: '*'
    })),
    animate('1s', style({ opacity: 1 }))
  ]),

  transition('expanded => collapsed', [
    animate('300ms ease-in')
  ])
]);








    