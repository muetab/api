package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"mue-api/internal/models"

	"github.com/go-chi/chi/v5"
)

type WeatherHandler struct {
}

func (h *WeatherHandler) GetLocationWeather(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	weather, err := models.GetLocationWeather(ctx, lat, lon)
	if err != nil {
		http.Error(w, "Failed to get weather data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weather)
}

func (h *WeatherHandler) GetWeather(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	city := r.URL.Query().Get("city")

	weather, err := models.GetWeather(ctx, city)
	if err != nil {
		http.Error(w, "Failed to get weather data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weather)
}