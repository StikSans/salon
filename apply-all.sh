#!/bin/bash

# Применяем MySQL Deployment
kubectl apply -f mysql-deployment.yaml

# Применяем Deployment для NestJS
kubectl apply -f nestjs-deployment.yaml

# Применяем Istio Gateway
kubectl apply -f istio-gateway.yaml

# Применяем Istio VirtualService
kubectl apply -f istio-virtualservice.yaml

# Применяем Istio DestinationRule для Sticky Session
kubectl apply -f istio-destinationrule.yaml

echo "Все YAML файлы применены!"
