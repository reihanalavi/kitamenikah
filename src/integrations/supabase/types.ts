export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Invitation: {
        Row: {
          createdAt: string
          id: string
          orderId: string
          publicUrl: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          orderId: string
          publicUrl: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          orderId?: string
          publicUrl?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Invitation_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      LandingpageContact: {
        Row: {
          createdAt: string
          icon: string | null
          id: string
          label: string
          value: string
        }
        Insert: {
          createdAt?: string
          icon?: string | null
          id: string
          label: string
          value: string
        }
        Update: {
          createdAt?: string
          icon?: string | null
          id?: string
          label?: string
          value?: string
        }
        Relationships: []
      }
      LandingpageFaq: {
        Row: {
          answer: string
          createdAt: string
          id: string
          question: string
        }
        Insert: {
          answer: string
          createdAt?: string
          id: string
          question: string
        }
        Update: {
          answer?: string
          createdAt?: string
          id?: string
          question?: string
        }
        Relationships: []
      }
      LandingpageFeature: {
        Row: {
          createdAt: string
          description: string
          icon: string
          id: string
          title: string
        }
        Insert: {
          createdAt?: string
          description: string
          icon: string
          id: string
          title: string
        }
        Update: {
          createdAt?: string
          description?: string
          icon?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      LandingpageTestimony: {
        Row: {
          avatarUrl: string | null
          created_at: string
          id: string
          message: string
          name: string
          "rating-star": number
        }
        Insert: {
          avatarUrl?: string | null
          created_at?: string
          id: string
          message: string
          name: string
          "rating-star": number
        }
        Update: {
          avatarUrl?: string | null
          created_at?: string
          id?: string
          message?: string
          name?: string
          "rating-star"?: number
        }
        Relationships: []
      }
      Order: {
        Row: {
          createdAt: string
          id: string
          status: string
          templateId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          status: string
          templateId: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          status?: string
          templateId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "Template"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Payment: {
        Row: {
          amount: number
          createdAt: string
          id: string
          method: string
          orderId: string
          paidAt: string | null
          status: string
          transactionId: string | null
        }
        Insert: {
          amount: number
          createdAt?: string
          id: string
          method: string
          orderId: string
          paidAt?: string | null
          status: string
          transactionId?: string | null
        }
        Update: {
          amount?: number
          createdAt?: string
          id?: string
          method?: string
          orderId?: string
          paidAt?: string | null
          status?: string
          transactionId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Payment_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      Pricing: {
        Row: {
          created_at: string
          deskripsi_paket: string
          harga_paket: number
          id: number
          paket: string
        }
        Insert: {
          created_at?: string
          deskripsi_paket: string
          harga_paket: number
          id?: number
          paket: string
        }
        Update: {
          created_at?: string
          deskripsi_paket?: string
          harga_paket?: number
          id?: number
          paket?: string
        }
        Relationships: []
      }
      PricingBenefit: {
        Row: {
          benefit: string | null
          created_at: string
          id: number
          id_pricing: number | null
        }
        Insert: {
          benefit?: string | null
          created_at?: string
          id?: number
          id_pricing?: number | null
        }
        Update: {
          benefit?: string | null
          created_at?: string
          id?: number
          id_pricing?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "PricingBenefit_id_pricing_fkey"
            columns: ["id_pricing"]
            isOneToOne: false
            referencedRelation: "Pricing"
            referencedColumns: ["id"]
          },
        ]
      }
      Template: {
        Row: {
          createdAt: string
          id: string
          name: string
          photo_url: string | null
          previewUrl: string
          price: number
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          photo_url?: string | null
          previewUrl: string
          price: number
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          photo_url?: string | null
          previewUrl?: string
          price?: number
        }
        Relationships: []
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
