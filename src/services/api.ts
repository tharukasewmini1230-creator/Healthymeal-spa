import axios from 'axios'
import type { Recipe } from '../types/recipe'

const API_BASE = 'https://dummyjson.com/recipes'

export const getRecipes = async (): Promise<Recipe[]> => {
  const res = await axios.get(API_BASE)
  return res.data.recipes
}

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const res = await axios.get(`${API_BASE}/${id}`)
  return res.data
}