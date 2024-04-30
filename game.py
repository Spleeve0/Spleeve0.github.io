# importing pygame
from email import header
from mimetypes import init
from turtle import color
import pygame
import random
# initializing as this is a pygame
pygame.init()

# Defining colors -
white = (255, 255, 255)
red = (255, 0, 0)
black = (0, 0, 0)


# defining screen size
screen_width = 900
screen_height = 600

# Creating game display window
gameWindow = pygame.display.set_mode((screen_width, screen_height))

# Setting game's title
pygame.display.set_caption("Snake Game Developed By Irfan")
# To see the changes we have to update
pygame.display.update()

# Initializing variables -
exit_game = False
game_over = False
# Snake position variable
snake_x = 45
snake_y = 45
velocity_x = 0
velocity_y = 0
snake_size = 15
fps = 60
score = 0
init_velocity = 5
snake_list = []
snake_length = 1

# Food position variable
food_x = random.randint(15, screen_width-15)
food_y = random.randint(15, screen_height-15)

# Making clock for updating frame
clock = pygame.time.Clock()

# Choosing font of the score display ->
font = pygame.font.SysFont(None, 55)
# Creating function for displaying score on the screen
def score_screen(text, color, x, y):
    screen_text = font.render(text, True, color)
    gameWindow.blit(screen_text, [x, y])

def plot_snake(gameWindow, color, snake_list, snake_size):
    for x,y in snake_list:
        pygame.draw.rect(gameWindow, color, [x, y, snake_size, snake_size])

# Defining Game Loop -
while not exit_game:
    # Handling event
    for event in pygame.event.get():
        # print(event)
        if event.type == pygame.QUIT:
            exit_game = True

        # Handling event Key press
        if event.type == pygame.KEYDOWN:
            # right key in +ve x direction
            if event.key == pygame.K_RIGHT:
                velocity_x = init_velocity
                velocity_y = 0

            # left key in -ve x direction
            if event.key == pygame.K_LEFT:
                velocity_x = -init_velocity
                velocity_y = 0

            # up key in +ve y direction
            if event.key == pygame.K_UP:
                velocity_y = -init_velocity
                velocity_x = 0

            # right key in -ve y direction
            if event.key == pygame.K_DOWN:
                velocity_y = init_velocity
                velocity_x = 0
    
    # Setting Velocity in x direction
    snake_x += velocity_x
    # Setting Velocity in y direction
    snake_y += velocity_y

    # Creating food catch and add upto the score -
    if abs(snake_x - food_x) < 8 and abs(snake_y - food_y) < 8:
        score += 10
        # change Food position variable
        food_x = random.randint(10, screen_width-10)
        food_y = random.randint(10, screen_height-10)
        snake_length += 5

    # Setting background color -
    gameWindow.fill(white)
    # calling score_screen() for displaying Score
    score_screen("Score: " + str(score), red, 5, 5)
    # Displaying Food after white background display
    pygame.draw.rect(gameWindow, red, [food_x, food_y, snake_size, snake_size])

    # Increasing length of the snake
    head = []
    head.append(snake_x)
    head.append(snake_y)
    snake_list.append(head)

    if len(snake_list)>snake_length:
        del snake_list[0
        ]

    # To make snake head rectangle -
    # pygame.draw.rect(gameWindow, black, [snake_x, snake_y, snake_size, snake_size])

    # 
    plot_snake(gameWindow, black, snake_list, snake_size)
    # To reflect the change or update the screen
    pygame.display.update()
    # every frame it updates
    clock.tick(fps)


# To quite the game
pygame.quit()
quit()
