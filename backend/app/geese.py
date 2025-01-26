import torch
import torch.nn as nn

"""
train_dataset = datasets.ImageFolder(root='train', transform=transform)
val_dataset = datasets.ImageFolder(root='val', transform=transform)

train_loader = DataLoader(train_dataset, batch_size=800, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=128, shuffle=True)"""

"""print(train_dataset.targets.count(0), train_dataset.targets.count(1))
for images, labels in train_loader:
    print(f"Image batch dimensions: {images.shape}")
    print(f"Label batch dimensions: {labels.shape}")
    break"""


class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )

        self.fc_layers = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 16 * 16, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 1),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        x = self.conv_layers(x)
        x = self.fc_layers(x)
        return x

# Initialize model, loss function, and optimizer
#device = torch.device('cuda' if torch.cuda.is_available() else 'mps' if torch.backends.mps.is_built() else 'cpu')
#model = SimpleCNN().to(device)

"""
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)"""
"""
# Training loop
def train_model(model, train_loader, val_loader, criterion, optimizer, epochs=10):
    train_loss_history = []
    val_loss_history = []

    for epoch in range(epochs):
        model.train()
        train_loss = 0.0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device, dtype=torch.float32)

            # Forward pass
            outputs = model(images)
            loss = criterion(outputs.squeeze(), labels)

            # Backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            train_loss += loss.item()

        # Validation loop
        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device, dtype=torch.float32)
                outputs = model(images)
                loss = criterion(outputs.squeeze(), labels)
                val_loss += loss.item()

                # Calculate accuracy
                predicted = (outputs.squeeze() > 0.5).float()
                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        train_loss /= len(train_loader)
        val_loss /= len(val_loader)
        accuracy = 100 * correct / total

        train_loss_history.append(train_loss)
        val_loss_history.append(val_loss)

        print(f"Epoch {epoch+1}/{epochs}, "
              f"Train Loss: {train_loss:.4f}, "
              f"Val Loss: {val_loss:.4f}, "
              f"Val Accuracy: {accuracy:.3f}%")

    return train_loss_history, val_loss_history

# Train the model
epochs = 100
train_loss, val_loss = train_model(model, train_loader, val_loader, criterion, optimizer, epochs)

def evaluate_on_10_images(model, val_loader, classes, num_images=10):
    model.eval()  # Set model to evaluation mode
    device = next(model.parameters()).device  # Get the model's device

    # Randomly select 10 images from the validation set
    images = []
    labels = []
    for batch_images, batch_labels in val_loader:
        images.extend(batch_images)
        labels.extend(batch_labels)
    
    # Randomly select 10 images from the list
    indices = random.sample(range(len(images)), num_images)
    selected_images = [images[i] for i in indices]
    selected_labels = [labels[i] for i in indices]

    # Convert the images and labels to the appropriate device
    selected_images = torch.stack(selected_images).to(device)
    selected_labels = torch.tensor(selected_labels).to(device)

    # Get model predictions
    with torch.no_grad():
        outputs = model(selected_images)
        predicted = (outputs.squeeze() > 0.5).float()  # Apply a threshold of 0.5 for binary classification

    # Plot the selected images and their predictions
    fig, axes = plt.subplots(2, 5, figsize=(15, 6))
    axes = axes.flatten()

    for i in range(num_images):
        img = F.to_pil_image(selected_images[i].cpu())  # Convert tensor to image
        axes[i].imshow(img, cmap="gray")
        axes[i].axis("off")
        axes[i].set_title(f"Pred: {classes[int(predicted[i])]} \nTrue: {classes[int(selected_labels[i])]}")

    plt.tight_layout()
    plt.show()

# After training, evaluate on 10 random validation images
evaluate_on_10_images(model, val_loader, train_dataset.classes, num_images=10)"""
"""

model.eval()

for image_path in image_paths:
    image = Image.open(image_path)
    image_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image_tensor)
        prediction = (output.squeeze() > 0.5).float()
    
    predicted_class = train_dataset.classes[int(prediction.item())]

    plt.figure()
    plt.imshow(image, cmap="gray")
    plt.title(f"Predicted: {predicted_class}")
    plt.axis("off")
    plt.show()

torch.save(model.state_dict(), 'simple_cnn_model_helpme.pth')
print("Model saved as 'simple_cnn_modelhelpme.pth'")
"""