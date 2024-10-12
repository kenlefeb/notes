import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { DailyNotes } from "./DailyNotes.ts";

Deno.test("DailyNotes - Add Note", () => {
  const dailyNotes = new DailyNotes();
  dailyNotes.addNote("Test Note");
  assertEquals(dailyNotes.getNotes().length, 1);
});

Deno.test("DailyNotes - Remove Note", () => {
  const dailyNotes = new DailyNotes();
  dailyNotes.addNote("Test Note");
  dailyNotes.removeNote();
  assertEquals(dailyNotes.getNotes().length, 0);
});

Deno.test("DailyNotes - Clear Notes", () => {
  const dailyNotes = new DailyNotes();
  dailyNotes.addNote("Test Note 1");
  dailyNotes.addNote("Test Note 2");
  dailyNotes.clearNotes();
  assertEquals(dailyNotes.getNotes().length, 0);
});