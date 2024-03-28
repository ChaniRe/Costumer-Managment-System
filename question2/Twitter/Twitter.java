import java.util.Scanner;

public class Twitter {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choiceOfUser;
        int height, width;
        
        do {
            System.out.println("\nPress 1: to build a rectangular tower\nPress 2 to build triangle tower\nPress 3 to exit");
            choiceOfUser = scanner.nextInt();
            
            switch (choiceOfUser) {
                case 1:
                    System.out.println("Please enter the height of the tower");
                    height = scanner.nextInt();
                    System.out.println("Please enter the width of the tower");
                    width = scanner.nextInt();
                    
                    System.out.println("Height of rectangular tower is " + height + "\nWidth is " + width);
                    if (height == width || (Math.abs(height - width) > 5)) {
                        System.out.println("The area is " + (height * width));
                    } else {
                        System.out.println("The perimeter of rectangular tower is " + ((2 * height) + (2 * width)));
                    }
                    break;
                    
                case 2:
                    System.out.println("Please enter the height of the triangle");
                    height = scanner.nextInt();
                    System.out.println("Please enter the width of the triangle");
                    width = scanner.nextInt();
                    
                    System.out.println("Height of triangle tower is " + height + "\nWidth is " + width);
                    
                    int optionTriangle;
                    System.out.println("Please enter 1 to get the perimeter of the triangle, and 2 to print the triangle");
                    optionTriangle = scanner.nextInt();
                    
                    switch (optionTriangle) {
                        case 1:
                            double hypotenuse = Math.sqrt(Math.pow(height, 2) + Math.pow(width / 2, 2));//Calculating the perimeter of a triangle by the Pythagorean theorem
                            System.out.println("The perimeter of triangle tower is " + ((2 * hypotenuse) + width));
                            break;
                            
                        case 2:
                            if ((width % 2 == 0) || (width > (2 * height))) {
                                System.out.println("The triangle cannot be printed");
                            } else {
                                int tempWidth;// the triangle width without the bottom line.
                                int tempHeight;// the triangle height without the bottom and the upper lines.
                                int floors; //how many floors int the new triangle
                                int linesInFloor;//how many lines in each floor.
                                int bool;
                                
                                if(width == 1){//end case
                                    for(int i = 0; i < height; i++){
                                        System.out.println("*");
                                    }
                                }
                                else if(width == 3){//end case
                                    for(int i = 0; i < height-1; i++){
                                        System.out.println(" * ");
                                    }
                                    System.out.println("***");
                                }
                                else{
                                    tempWidth = width-2;
                                    tempHeight = height - 2;
                                    floors = tempWidth/2;
                                    linesInFloor = tempHeight/floors;
                                    bool = 0;//boolean 
                                    
                                    System.out.println(" ".repeat(floors+1)+"*"+ " ".repeat(floors));//print the upper line
                                    for(int i = 0; i < floors; i++){//print the middle lines of the triangle
                                        if(linesInFloor * floors != tempHeight){//If the number of rows in the middle does not divide exactly, then the top group will contain additional rows according to the remainder of the division.
                                            for(int k = 0; k < (tempHeight - (linesInFloor*floors)) && (bool == 0); k++){
                                                System.out.println(" ".repeat(floors-i)+"*".repeat(2*i+3) + " ".repeat(floors-i-1));
                                            }
                                        }
                                        bool = 1;
                                        for(int j = 0; j < linesInFloor; j++){//Printing the additional lines
                                            System.out.println(" ".repeat(floors-i)+"*".repeat(2*i+3) + " ".repeat(floors-i-1));
                                        }
                                    }
                                    for (int i = 0; i < width; i++) {//print the bottom line
                                        System.out.print("*");
                                    }
                                }

                            }
                            break;
                    }
                    break;
            }
        } while (choiceOfUser != 3);//while the user doesnt press 3, the other options will recieved
        
        scanner.close();//if user press 3, exit
    }
}
