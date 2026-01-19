export interface Database {
  public: {
    Tables: {
      scripts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string
          code: string
          status: 'active' | 'inactive'
          last_run: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description: string
          code: string
          status?: 'active' | 'inactive'
          last_run?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string
          code?: string
          status?: 'active' | 'inactive'
          last_run?: string | null
        }
      }
      executions: {
        Row: {
          id: string
          created_at: string
          script_id: string
          status: 'success' | 'error' | 'running'
          result: string | null
          error: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          script_id: string
          status: 'success' | 'error' | 'running'
          result?: string | null
          error?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          script_id?: string
          status?: 'success' | 'error' | 'running'
          result?: string | null
          error?: string | null
        }
      }
    }
  }
}
