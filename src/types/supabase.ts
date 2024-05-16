export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Distance = Record<string, string>[];

export interface Database {
  public: {
    Tables: {
      book_mark: {
        Row: {
          created_at: string;
          id: string;
          plan_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          plan_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          plan_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_mark_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_mark_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          plan_id: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          plan_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          plan_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      pins: {
        Row: {
          contents: PinContentsType[];
          date: string;
          id: string;
          plan_id: string;
        };
        Insert: {
          contents: PinContentsType[];
          date: string;
          id?: string;
          plan_id: string;
        };
        Update: {
          contents?: PinContentsType[];
          date?: string;
          id?: string;
          plan_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pins_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
        ];
      };
      plans: {
        Row: {
          created_at: string;
          dates: string[];
          id: string;
          isDeleted: boolean;
          plan_state: 'planning' | 'traveling' | 'recording' | 'end';
          title: string;
          total_cost: string;
          users_id: string;
        };
        Insert: {
          created_at?: string;
          dates: string[];
          id: string;
          isDeleted: boolean;
          plan_state: 'planning' | 'traveling' | 'recording' | 'end';
          title: string;
          total_cost: string;
          users_id: string;
        };
        Update: {
          created_at?: string;
          dates?: string[];
          id?: string;
          isDeleted?: boolean;
          plan_state?: 'planning' | 'traveling' | 'recording' | 'end';
          title?: string;
          total_cost?: string;
          users_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'plans_users_id_fkey';
            columns: ['users_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          id: string;
          nickname: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          id: string;
          nickname: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string;
        };

        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      plan_mates: {
        Row: {
          id: string;
          users_id: string[];
        };
        Insert: {
          id: string;
          users_id: string[];
        };
        Update: {
          id?: string;
          users_id?: string[];
        };
        Relationships: [
          {
            foreignKeyName: 'plan_mates_id_fkey';
            columns: ['id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
        ];
      };
      plans_ending: {
        Row: {
          dates: string[];
          dates_cost: string[] | null;
          distance: Distance;
          id: string;
          pictures: string[];
          title: string;
          total_cost: string;
        };
        Insert: {
          dates?: string[];
          dates_cost?: string[] | null;
          distance: Distance;
          id: string;
          pictures?: string[];
          title?: string;
          total_cost?: string;
        };
        Update: {
          dates?: string[];
          dates_cost?: string[] | null;
          distance?: Distance | null;
          id?: string;
          pictures?: string[];
          title?: string;
          total_cost?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'plans_ending_id_fkey';
            columns: ['id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface PinContentsType {
  id?: string;
  lat: number;
  lng: number;
  placeName?: string;
  cost?: string | null;
  address?: string;
  distance?: number | undefined;
}

export type PinType = Database['public']['Tables']['pins']['Row'];
export type PinInsertType = Database['public']['Tables']['pins']['Insert'];
export type PinUpdateType = Database['public']['Tables']['pins']['Update'];
export type UserType = Database['public']['Tables']['users']['Insert'];
export type InsertPlanType = Database['public']['Tables']['plans']['Insert'];
export type PlanType = Database['public']['Tables']['plans']['Row'];
export type BookMarkType = Database['public']['Tables']['book_mark']['Row'];
export type InsertBookMarkType = Database['public']['Tables']['book_mark']['Insert'];
export type PlanMatesType = Database['public']['Tables']['plan_mates']['Insert'];
export type CommentsType = Database['public']['Tables']['comments']['Insert'];
export type EndingPlanType = Database['public']['Tables']['plans_ending']['Row'];
